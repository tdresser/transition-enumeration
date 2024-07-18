import { Example } from "../example";
import { ExampleState } from "../example_state";
import IframeExpandsCss from './styles/iframe_expands.css?inline';

export function IframeExpands() {
    const state = new ExampleState();

    return <>
        <Example
            vtStyle={IframeExpandsCss}
            state={state}
            startPage={
                // This is a bit of a hack. We want to scale the iframe so it fits in the viewport,
                // But then the default animation starts scaling things weirdly. Scale this consistently
                // to avoid weird artifacts.
                <div style={{
                    width: "220%", height: "220%", transform: "scale(0.4)", transformOrigin: "top left"
                }} onClick={
                    () => {
                        console.log("CLICK");
                        state.activate()
                    }}>
                    <img src="https://imgs.xkcd.com/comics/pole_vault.png"></img>
                </div>
            }
            endPage={
                <div style={{ width: "100%", height: "100%" }}>
                    <iframe src="https://xkcd.com/2955" style={{
                        width: "900px", height: "220%", transform: "scale(0.4)", transformOrigin: "top left"
                    }}></iframe>
                </div>
            }>
        </Example >
    </>
}
