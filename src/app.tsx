import '@picocss/pico/css/pico.classless.css'
import './app.css'
import { Detail } from './pages/detail'
import { Aggregator } from './pages/aggregator'
import { Example } from './example'
import { ExampleState } from './example_state'
import { AggregatorPreservesHeader } from './examples/aggregator_preserves_header'

import SharedAxisCSS from './examples/styles/shared_axis.css?inline';
import SharedAxisZoomCSS from './examples/styles/shared_axis_zoom_in.css?inline';
import SharedAxisZoomOutCSS from './examples/styles/shared_axis_zoom_out.css?inline';

import { AggregatorImageToWholePage } from './examples/aggregator_image_to_whole_page'

export function App() {
  // TODO: managing these state objects is annoying. Is there a better way?
  const example1State = new ExampleState(3);
  const example2State = new ExampleState(3);
  const example3State = new ExampleState(3);

  // TODO: reusing vt-names breaks things. Maybe enforce container scope for names somehow.

  return (
    <>
      {/* Forward and back examples of preserving a header image. */}
      <AggregatorPreservesHeader></AggregatorPreservesHeader>
      <AggregatorImageToWholePage></AggregatorImageToWholePage>

      {/* https://m2.material.io/design/motion/the-motion-system.html#shared-axis */}
      <Example title="Shared Axis"
        vtStyle={SharedAxisCSS}
        state={example1State}
        startPage={
          <Detail firstPage state={example1State}></Detail>
        }
        endPage={
          <Aggregator state={example1State}></Aggregator>
        }>
      </Example>

      <Example title="Shared Axis Zoom"
        vtStyle={SharedAxisZoomCSS}
        state={example2State}
        vtReverseStyle={SharedAxisZoomOutCSS}
        startPage={
          <Aggregator firstPage state={example2State}></Aggregator>
        }
        endPage={
          <Detail state={example2State}></Detail>
        }>
      </Example>

      <Example title="Simple Crossfade"
        state={example3State}
        startPage={
          <Detail firstPage state={example3State}></Detail>
        }
        endPage={
          <Aggregator state={example3State}></Aggregator>
        }>
      </Example>
    </>
  )
}

