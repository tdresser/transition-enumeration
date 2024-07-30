import page1 from '/images/real/1_no_omnibox.png'
import page2 from '/images/real/2_no_omnibox.png'
import page3 from '/images/real/3_no_omnibox.png'

import page1_destination_header from '/images/real/1_no_omnibox_x39_y822_1005x566.png'
import page2_destination_header from '/images/real/2_no_omnibox_x0_y800_1080_609.png'
import page3_destination_header from '/images/real/3_no_omnibox_x0_y135_1080x859.png'

import page1_source_header from '/images/real/1_no_omnibox_source.png'
import page2_source_header from '/images/real/2_no_omnibox_source.png'
import page3_source_header from '/images/real/3_no_omnibox_source.png'

export const DISPLAY_RATIO = 340 / 1080;

interface ImagePosition {
    x: number,
    y: number,
    width: number,
    height: number
}
export interface AggregatorImageData {
    pageImage: string,
    sourceHeaderImage: string,
    sourceHeaderPosition: ImagePosition,
    destinationHeaderImage: string,
    destinationHeaderPosition: ImagePosition,
    sourceRowPosition: ImagePosition
}

export const AGGREGATOR_IMAGES: AggregatorImageData[] = [
    {
        pageImage: page1,
        sourceHeaderImage: page1_source_header,
        sourceHeaderPosition: {
            x: 839,
            y: 1051,
            width: 205,
            height: 153,
        },
        destinationHeaderPosition: {
            x: 39,
            y: 822,
            width: 1005,
            height: 566,
        },
        destinationHeaderImage: page1_destination_header,
        sourceRowPosition: {
            x: 0,
            y: 1016,
            width: 1080,
            height: 346,
        }
    },
    {
        pageImage: page2,
        sourceHeaderImage: page2_source_header,
        sourceHeaderPosition: {
            x: 839,
            y: 1379,
            width: 205,
            height: 154,
        },
        destinationHeaderPosition: {
            x: 0,
            y: 800,
            width: 1080,
            height: 609,
        },
        destinationHeaderImage: page2_destination_header,
        sourceRowPosition: {
            x: 0,
            y: 1363,
            width: 1080,
            height: 346,
        }
    },
    {
        pageImage: page3,
        sourceHeaderImage: page3_source_header,
        sourceHeaderPosition: {
            x: 849,
            y: 1705,
            width: 196,
            height: 149
        },
        destinationHeaderPosition: {
            x: 0,
            y: 135,
            width: 1080,
            height: 859
        },
        destinationHeaderImage: page3_destination_header,
        sourceRowPosition: {
            x: 0,
            y: 1709,
            width: 1080,
            height: 429,
        }
    }
];