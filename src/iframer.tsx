import { JSX, render } from "preact/compat";
import { useMemo, useState } from "preact/hooks";

import picocss from "@picocss/pico/css/pico.classless.css?inline";
import perPageCss from "./per_page.css?inline";
import { fail } from "./util";
import { ExampleState } from "./example_state";

interface IFramerProps {
  children: JSX.Element | JSX.Element[];
  state: ExampleState
}

export function IFramer(props: IFramerProps) {
  const [iframeEl, setiframeEl] = useState<HTMLIFrameElement | null>(null);
  useMemo(() => {
    let document = iframeEl?.contentWindow?.document;

    if (document) {
      props.state.document = document;
      const style1 = document.createElement("style") ?? fail();
      style1.innerText = picocss;
      document.head.appendChild(style1);

      const style2 = document.createElement("style") ?? fail();
      style2.innerText = perPageCss;
      document.head.appendChild(style2);

      const style3 = document.createElement("style") ?? fail();
      style3.id = "vtstyle";
      document.head.appendChild(style3);


      render(props.children, document?.body);
    }
  }, [iframeEl])

  // {document?.body && createPortal(props.children, document?.body)}
  return (
    <>
      <iframe ref={setiframeEl}></iframe>
    </>
  );
}
