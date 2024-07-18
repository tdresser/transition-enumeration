import { Example } from "../example";
import { ExampleState } from "../example_state";
import IframeExpandsCss from './../examples/styles/iframe_expands.css?inline';

export function IframeExpandsFull() {
    const state = new ExampleState();

    return <>
        <Example
            vtStyle={IframeExpandsCss}
            state={state}
            startPage={
                <div style={{
                    width: "100%", height: "100%", transformOrigin: "top left"
                }} onClick={
                    () => {
                        console.log("CLICK");
                        state.activate()
                        window.setTimeout(() => {
                            window.location.href = "https://xkcd.com/2955/";
                        }, 500);
                    }}>
                    <img src="https://imgs.xkcd.com/comics/pole_vault.png"></img>
                </div>
            }
            endPage={
                <div style={{ width: "100%", height: "100%" }}>
                    <iframe src="https://xkcd.com/2955" style={{
                        width: "100%", height: "100%"
                    }}></iframe>
                </div>
            }>
        </Example >
    </>
}
