import * as React from "react";
import { Html, Head, Preview, Body, Container, Heading, Text, Hr } from "@react-email/components";

export default function WorkshopEnquiryEmail({
  name,
  email,
  phone,
  address,
  about,
  workshopId,
}: any) {
  return (
    <Html>
      <Head />
      <Preview>New workshop enquiry from {name}</Preview>
      <Body style={{ backgroundColor: "#fff", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container
          style={{
            margin: "40px auto",
            padding: "20px",
            border: "1px solid #eee",
            borderRadius: "12px",
            maxWidth: "600px",
          }}
        >
          <Heading style={{ color: "#C4A061", marginBottom: "8px" }}>✨ The Art of Sensuality</Heading>
          <Text>A new workshop enquiry has been submitted:</Text>

          <Hr style={{ borderColor: "#C4A061" }} />

          <Text><strong>Name:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Phone:</strong> {phone}</Text>
          <Text><strong>Address:</strong> {address}</Text>
          <Text><strong>About:</strong> {about}</Text>
          <Text><strong>Workshop ID:</strong> {workshopId}</Text>

          <Hr style={{ borderColor: "#C4A061" }} />

          <Text style={{ fontSize: "12px", color: "#555" }}>
            Sent automatically from <strong>The Art of Sensuality</strong> website.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}