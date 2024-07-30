import "@picocss/pico/css/pico.classless.css";
import "./per_page.css";
import "./main.css";

import { Example } from "./example";
import { ExampleState } from "./example_state";

import SharedAxisCSS from "./examples/styles/shared_axis.css?inline";
import SharedAxisRightCSS from "./examples/styles/shared_axis_right.css?inline";
import SharedAxisZoomCSS from "./examples/styles/shared_axis_zoom_in.css?inline";
import SharedAxisZoomOutCSS from "./examples/styles/shared_axis_zoom_out.css?inline";

import { IFramer } from "./iframer";
import { AggregatorContainerTransform } from "./examples/aggregator_container_transform";
import { PassThrough } from "./pages/passThrough";

export function App() {
  // TODO: managing these state objects is annoying. Is there a better way?
  const articleSourceState = new ExampleState();
  const crossFadeState = new ExampleState();
  const nextPreviousState = new ExampleState(3);


  return (
    <>
      <h1>Container Transform: Source Root to Destination Root.</h1>
      <p>Click one of the three rows with images.</p>
      <AggregatorContainerTransform
        sourceSelector=".link_overlay.active .empty_target"
        destinationSelector=".page"></AggregatorContainerTransform>

      <h1>Container Transform: Source Element to Destination Root.</h1>
      <AggregatorContainerTransform
        sourceSelector=".link_overlay.active .link_overlay_inner"
        destinationSelector=".page"></AggregatorContainerTransform>

      <h1>Container Transform: Source Element to Destination Root.</h1>
      <p>With target location</p>
      <AggregatorContainerTransform
        sourceSelector=".link_overlay.active .link_overlay_inner"
        destinationSelector=".empty_target"></AggregatorContainerTransform>

      <h1>Container Transform: Source Element to Destination Header.</h1>
      <AggregatorContainerTransform
        sourceSelector=".link_overlay.active .link_overlay_inner"
        destinationSelector=".detail_header"></AggregatorContainerTransform>

      <h1>Cross Fade: could be full page container transform</h1>
      <IFramer state={crossFadeState}>
        <Example
          state={crossFadeState}
          startPage={<PassThrough firstPage state={crossFadeState}>
            <img src="images/in_out/article_no_omnibox.png"></img>
          </PassThrough>}
          endPage={<PassThrough state={crossFadeState}>
            <img src="images/in_out/source_no_omnibox.png"></img>
          </PassThrough>}
        ></Example>
      </IFramer>

      <h1>Shared Axis Zoom - from Article to Source and Back</h1>
      <IFramer state={articleSourceState}>
        <Example
          vtStyle={SharedAxisZoomCSS}
          state={articleSourceState}
          vtReverseStyle={SharedAxisZoomOutCSS}
          startPage={<PassThrough firstPage state={articleSourceState}>
            <img src="images/in_out/article_no_omnibox.png"></img>
          </PassThrough>}
          endPage={<PassThrough state={articleSourceState}>
            <img src="images/in_out/source_no_omnibox.png"></img>
          </PassThrough>}
        ></Example>
      </IFramer>


      <h1>Shared Axis Slide.</h1>
      <IFramer state={nextPreviousState}>
        {/* https://m2.material.io/design/motion/the-motion-system.html#shared-axis */}
        <Example
          vtStyle={SharedAxisCSS}
          vtReverseStyle={SharedAxisRightCSS}
          state={nextPreviousState}
          startPage={<PassThrough firstPage state={nextPreviousState}>
            <img src="images/in_out/article_no_omnibox.png"></img>
          </PassThrough>}
          endPage={<PassThrough state={nextPreviousState}>
            <img src="images/in_out/source_no_omnibox.png"></img>
          </PassThrough>}
        ></Example>
      </IFramer>
    </>
  );
}
