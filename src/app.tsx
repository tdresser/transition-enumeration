import "@picocss/pico/css/pico.classless.css";
import "./per_page.css";
import "./main.css";

import { FakeDetail } from "./pages/fake_detail";
import { FakeAggregator } from "./pages/fake_aggregator";
import { Example } from "./example";
import { ExampleState } from "./example_state";
import { FakeAggregatorPreservesHeader } from "./examples/fake_aggregator_preserves_header";

import SharedAxisCSS from "./examples/styles/shared_axis.css?inline";
import SharedAxisZoomCSS from "./examples/styles/shared_axis_zoom_in.css?inline";
import SharedAxisZoomOutCSS from "./examples/styles/shared_axis_zoom_out.css?inline";

import { FakeAggregatorImageToWholePage } from "./examples/fake_aggregator_image_to_whole_page";
import { IFramer } from "./iframer";
import { AggregatorImageToWholePage } from "./examples/aggregator_image_to_whole_page";
import { PassThrough } from "./pages/passThrough";

export function App() {
  // TODO: managing these state objects is annoying. Is there a better way?
  const example1State = new ExampleState(3);
  const example2State = new ExampleState(3);
  const example3State = new ExampleState(3);
  const articleSourceState = new ExampleState();


  return (
    <>
      <h1>Container Transform</h1>
      <p>Click one of the three rows with images.</p>
      <AggregatorImageToWholePage></AggregatorImageToWholePage>

      <h1>Shared Axis Zoom - from Article to Source and Back</h1>
      <IFramer state={articleSourceState}>
        <Example
          vtStyle={SharedAxisZoomCSS}
          state={articleSourceState}
          vtReverseStyle={SharedAxisZoomOutCSS}
          startPage={<PassThrough firstPage state={articleSourceState}>
            <img src="public/images/in_out/article_no_omnibox.png"></img>
          </PassThrough>}
          endPage={<PassThrough state={articleSourceState}>
            <img src="public/images/in_out/source_no_omnibox.png"></img>
          </PassThrough>}
        ></Example>
      </IFramer>

      <h1>Aggregator Image Expands to Header</h1>
      <FakeAggregatorPreservesHeader></FakeAggregatorPreservesHeader>

      <h1>Aggregator Image Expands to Whole Page</h1>
      <FakeAggregatorImageToWholePage></FakeAggregatorImageToWholePage>

      <h1>Shared Axis</h1>
      <IFramer state={example1State}>
        {/* https://m2.material.io/design/motion/the-motion-system.html#shared-axis */}
        <Example
          vtStyle={SharedAxisCSS}
          state={example1State}
          startPage={<FakeDetail firstPage state={example1State}></FakeDetail>}
          endPage={<FakeAggregator state={example1State}></FakeAggregator>}
        ></Example>
      </IFramer>

      <h1>Shared Axis Zoom</h1>
      <IFramer state={example2State}>
        <Example
          vtStyle={SharedAxisZoomCSS}
          state={example2State}
          vtReverseStyle={SharedAxisZoomOutCSS}
          startPage={<FakeAggregator firstPage state={example2State}></FakeAggregator>}
          endPage={<FakeDetail state={example2State}></FakeDetail>}
        ></Example>
      </IFramer>

      <h1>Simple Crossfade</h1>
      <IFramer state={example3State}>
        <Example
          state={example3State}
          startPage={<FakeDetail firstPage state={example3State}></FakeDetail>}
          endPage={<FakeAggregator state={example3State}></FakeAggregator>}
        ></Example>
      </IFramer>
    </>
  );
}
