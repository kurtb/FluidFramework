/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Form, Input, Modal } from "antd";
// eslint-disable-next-line import/no-internal-modules
import { FormComponentProps } from "antd/lib/form";
// eslint-disable-next-line import/no-internal-modules, import/no-unassigned-import
import "antd/lib/form/style/css";
// eslint-disable-next-line import/no-internal-modules, import/no-unassigned-import
import "antd/lib/input/style/css";
// eslint-disable-next-line import/no-internal-modules, import/no-unassigned-import
import "antd/lib/modal/style/css";
// eslint-disable-next-line import/no-internal-modules, import/no-unassigned-import
import "antd/lib/radio/style/css";
import * as React from "react";

const FormItem = Form.Item;

export interface IKeyValueCreateProps extends FormComponentProps {
    confirmLoading: boolean;
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void;
}

export class CreateKeyValueModal extends React.Component<IKeyValueCreateProps> {
    constructor(props: IKeyValueCreateProps) {
        super(props);
    }

    public render() {
        const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Create a new item"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
                confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <FormItem label="Key">
                        {getFieldDecorator("key", {
                            rules: [
                                { required: true, message: "Please input key" },
                                { required: true, message: "key should be at least 1 character", min: 1 },
                            ],
                        })(
                            <Input />,
                        )}
                    </FormItem>
                    <FormItem label="Value">
                        {getFieldDecorator("value", {
                            rules: [
                                { required: true, message: "Please input value" },
                                { required: true, message: "Value should be at least 1 character", min: 1 },
                            ],
                        })(
                            <Input />,
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
