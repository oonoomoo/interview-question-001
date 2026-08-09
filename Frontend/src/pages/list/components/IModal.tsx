import React from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Grid,
  Input,
  Modal,
  Row,
  Space,
  type FormInstance,
  type FormProps,
} from "antd";
import dayjs from "dayjs";
import type { FieldType } from "..";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  form: FormInstance<FieldType>;
  mode?: "add" | "view";
  onClose?: () => void;
  onOk?: (formValues: FieldType) => void;
};

const IModal: React.FC<Props> = (props: Props) => {
  const { isOpen, form, mode, onClose, onOk } = props;
  const isViewMode = mode === "view";
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.sm;
  const compactFieldWidth = isMobile ? "100%" : "180px";
  const age = Form.useWatch("age", form);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    console.log("Success:", JSON.stringify(values, null, 2));
    onOk?.(values);
  };

  const renderFooter = () => {
    if (isViewMode) {
      return (
        <Row justify="end">
          <Button type="primary" danger onClick={handleCancel}>
            ปิด
          </Button>
        </Row>
      );
    }

    return (
      <Row justify="end">
        <Space size={8}>
          <Button type="primary" onClick={handleOk}>
            บันทึก
          </Button>
          <Button type="primary" danger onClick={handleCancel}>
            ยกเลิก
          </Button>
        </Space>
      </Row>
    );
  };

  return (
    <>
      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="ยกเลิก"
        okText="บันทึก"
        footer={renderFooter()}
      >
        <ContentStyle>
          <Form
            form={form}
            onFinish={onFinish}
            layout={isMobile ? "vertical" : "horizontal"}
            labelCol={isMobile ? undefined : { flex: "80px" }}
            wrapperCol={isMobile ? undefined : { flex: 1 }}
          >
            <Row gutter={[16, 0]}>
              <Col xs={isMobile ? 24 : undefined}>
                <Form.Item<FieldType>
                  label="ชื่อ - สกุล"
                  name="firstName"
                  rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
                >
                  <Input
                    placeholder="ชื่อ"
                    readOnly={isViewMode}
                    style={{ width: compactFieldWidth }}
                  />
                </Form.Item>
              </Col>
              <Col xs={isMobile ? 24 : undefined}>
                <Form.Item<FieldType>
                  name="lastName"
                  rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
                >
                  <Input
                    placeholder="นามสกุล"
                    readOnly={isViewMode}
                    style={{ width: isMobile ? "100%" : undefined }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item<FieldType>
              label="วันเกิด"
              name="birthDate"
              rules={[
                { required: true, message: "Please input your birth date!" },
              ]}
            >
              <DatePicker
                style={{ width: compactFieldWidth }}
                inputReadOnly={isViewMode}
                open={isViewMode ? false : undefined}
                allowClear={isViewMode ? false : undefined}
                onChange={(date) => {
                  form.setFieldValue(
                    "age",
                    date ? dayjs().diff(date, "year") : undefined,
                  );
                }}
              />
            </Form.Item>
            <Form.Item<FieldType> label="อายุ" name="age">
              {<span>{age ?? "xx"} ปี</span>}
            </Form.Item>
            <Form.Item<FieldType>
              label="ที่อยู่"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea readOnly={isViewMode} />
            </Form.Item>
          </Form>
        </ContentStyle>
      </Modal>
    </>
  );
};

const ContentStyle = styled.div`
  margin-top: 40px;
`;

export default IModal;
