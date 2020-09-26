/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Buffer } from "buffer";
import { ISnapshotTree } from "@fluidframework/protocol-definitions";
import { SummaryTreeBuilder } from "@fluidframework/runtime-utils";
import { ISummarizeResult } from "@fluidframework/runtime-definitions";

export function convertSnapshotToSummaryTree(snapshotTree: ISnapshotTree): ISummarizeResult {
    const builder = new SummaryTreeBuilder();
    const blobMapInitial = new Map(Object.entries(snapshotTree.blobs));
    const blobMapFinal = new Map<string, string>();
    for (const [key, value] of blobMapInitial.entries()) {
        if (blobMapInitial.has(value)) {
            blobMapFinal[key] = blobMapInitial.get(value);
        }
    }
    for (const [key, value] of Object.entries(blobMapFinal)) {
        const decoded = Buffer.from(value, "base64").toString();
        builder.addBlob(key, decoded);
    }
    for (const [key, tree] of Object.entries(snapshotTree.trees)) {
        const subtree = convertSnapshotToSummaryTree(tree);
        builder.addWithStats(key, subtree);
    }
    return builder.getSummaryTree();
}
