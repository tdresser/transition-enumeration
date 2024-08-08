import { VNode } from "preact";
import { ExampleState } from "./example_state";
import { StateUpdater, useMemo, useRef, useState } from "preact/hooks";
import { fail, generateScopedQuery } from "./util";

type SelectorToVTNameMap = { [x: string]: string };

interface ExampleProps {
  height?: string;
  state: ExampleState;
  startPage: VNode<any>;
  endPage: VNode<any>;
  // This is required for `pnpm build`, but not `pnpm run dev`. Not sure why.
  children?: never[];
  startPageSelectorToVTNameMap?: SelectorToVTNameMap;
  endPageSelectorToVTNameMap?: SelectorToVTNameMap;
  vtStyle?: string;
  vtReverseStyle?: string;
}

interface doVTParams {
  document: Document;
  container: HTMLElement;
  outgoingPageSelectorToVTNameMap?: SelectorToVTNameMap;
  incomingPageSelectorToVTNameMap?: SelectorToVTNameMap;
  vtStyle?: string;
  destination: VNode<any>;
  setCurrentPage: (value: StateUpdater<VNode<any>>) => void;
}

function applySelectorToVTNameMap(
  container: HTMLElement,
  map?: SelectorToVTNameMap
) {
  if (!map) {
    return;
  }
  const query = generateScopedQuery(container);
  Object.entries(map).forEach(([selector, vtName]) => {
    const el = query(selector);
    el.style.viewTransitionName = vtName;
  });
}

function clearVTNames(container: HTMLElement, map?: SelectorToVTNameMap) {
  if (!map) {
    return;
  }
  const query = generateScopedQuery(container);
  Object.entries(map).forEach(([selector, _]) => {
    const el = query(selector);
    el.style.viewTransitionName = "";
  });
}

function doVT(params: doVTParams) {
  const document = params.document;
  const window = document.defaultView ?? fail();

  // rafs are a hack because we can't explicitly wait for render.
  window.requestAnimationFrame(() => {
    applySelectorToVTNameMap(
      params.container,
      params.outgoingPageSelectorToVTNameMap
    );
    params.container.style.viewTransitionName = "active-container";
    const styleSheet = document.getElementById("vtstyle") ?? fail();
    styleSheet.innerText = params.vtStyle ?? "";
    // @ts-ignore
    const vt = params.document.startViewTransition(() => {
      params.setCurrentPage(params.destination);
      return new Promise<void>((resolve, _) => {
        window.setTimeout(() => {
          applySelectorToVTNameMap(
            params.container,
            params.incomingPageSelectorToVTNameMap
          );
          resolve();
        }, 0);
      });
    });
    vt.finished.then(() => {
      clearVTNames(
        params.container,
        params.incomingPageSelectorToVTNameMap
      );
      params.container.style.viewTransitionName = "";
    })
  });
}

export function Example(props: ExampleProps) {
  const container = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(props.startPage);

  useMemo(() => {
    props.state.listenToActivation((state) => {
      if (state.activated) {
        doVT({
          document: props.state.document ?? fail(),
          container: container.current ?? fail(),
          outgoingPageSelectorToVTNameMap: props.startPageSelectorToVTNameMap,
          incomingPageSelectorToVTNameMap: props.endPageSelectorToVTNameMap,
          vtStyle: props.vtStyle,
          destination: props.endPage,
          setCurrentPage,
        });
      } else {
        doVT({
          document: props.state.document ?? fail(),
          container: container.current ?? fail(),
          // Swap the order
          outgoingPageSelectorToVTNameMap: props.endPageSelectorToVTNameMap,
          incomingPageSelectorToVTNameMap: props.startPageSelectorToVTNameMap,
          vtStyle: props.vtReverseStyle ? props.vtReverseStyle : props.vtStyle,
          destination: props.startPage,
          setCurrentPage,
        });
      }
    });
  }, []);

  return (
    <>
      <div ref={container} class="container" style={{}}>
        <div style={props.startPage != currentPage ? { display: "none" } : {}}>{props.startPage}</div>
        <div style={props.endPage != currentPage ? { display: "none" } : {}}>{props.endPage}</div>
      </div>
    </>
  );
}
