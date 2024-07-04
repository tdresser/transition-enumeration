export class ExampleState {
    listeners: ((x: ExampleState) => void)[] = [];
    activated: boolean = false;
    linkIndex?: number;
    initialLinkIndex?: number;

    constructor(index?: number) {
        this.linkIndex = index;
        this.initialLinkIndex = index;
    }

    activate(index?: number) {
        if (index !== undefined) {
            this.linkIndex = index;
        }
        this.activated = true;
        for (const listener of this.listeners) {
            listener(this);
        }
    }

    listenToActivation(cb: ((x: ExampleState) => void)) {
        this.listeners.push(cb);
    }

    reset() {
        this.activated = false;
        this.linkIndex = this.initialLinkIndex;
        for (const listener of this.listeners) {
            listener(this);
        }
    }
}