import "@picocss/pico/css/pico.classless.css";
import "./per_page.css";
import "./main.css";

import { Detail } from "./pages/detail";
import { FakeAggregator } from "./pages/fake_aggregator";
import { Example } from "./example";
import { ExampleState } from "./example_state";
import { AggregatorPreservesHeader } from "./examples/aggregator_preserves_header";

import SharedAxisCSS from "./examples/styles/shared_axis.css?inline";
import SharedAxisZoomCSS from "./examples/styles/shared_axis_zoom_in.css?inline";
import SharedAxisZoomOutCSS from "./examples/styles/shared_axis_zoom_out.css?inline";

import { AggregatorImageToWholePage } from "./examples/aggregator_image_to_whole_page";
import { IFramer } from "./iframer";
import { Aggregator } from "./pages/aggregator";

export function App() {
  // TODO: managing these state objects is annoying. Is there a better way?
  const example1State = new ExampleState(3);
  const example2State = new ExampleState(3);
  const example3State = new ExampleState(3);

  return (
    <>
      <h1>WIP</h1>
      <IFramer state={example3State}>
        <Example
          state={example3State}
          startPage={<Aggregator state={example3State}></Aggregator>}
          endPage={<Aggregator state={example3State}></Aggregator>}
        ></Example>
      </IFramer>

      <h1>Aggregator Image Expands to Header</h1>
      <AggregatorPreservesHeader></AggregatorPreservesHeader>

      <h1>Aggregator Image Expands to Whole Page</h1>
      <AggregatorImageToWholePage></AggregatorImageToWholePage>

      <h1>Shared Axis</h1>
      <IFramer state={example1State}>
        {/* https://m2.material.io/design/motion/the-motion-system.html#shared-axis */}
        <Example
          vtStyle={SharedAxisCSS}
          state={example1State}
          startPage={<Detail firstPage state={example1State}></Detail>}
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
          endPage={<Detail state={example2State}></Detail>}
        ></Example>
      </IFramer>

      <h1>Simple Crossfade</h1>
      <IFramer state={example3State}>
        <Example
          state={example3State}
          startPage={<Detail firstPage state={example3State}></Detail>}
          endPage={<FakeAggregator state={example3State}></FakeAggregator>}
        ></Example>
      </IFramer>
    </>
  );
}
