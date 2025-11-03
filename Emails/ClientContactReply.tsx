import * as React from "react";

export default function ClientContactReply({ name }: { name: string }) {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        backgroundColor: "#ffffff",
        padding: "40px",
        color: "#111",
        borderRadius: "10px",
        border: "1px solid #eee",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <img
          src="https://taosense.uk/images/taos-logo.png"
          alt="TAOS Logo"
          width="160"
          style={{ marginBottom: "12px" }}
        />
        <h1 style={{ color: "#C9A46C", fontWeight: "700", fontSize: "22px" }}>
          The Art of Sensuality
        </h1>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        Dear {name},
        <br />
        <br />
        Your message has been received. Thank you for opening this moment of
        connection.
        <br />
        <br />
        We’ll be in touch soon.
      </p>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#C9A46C",
          fontWeight: "600",
          marginTop: "40px",
        }}
      >
        With warmth and presence,  
        <br />
        The Art of Sensuality
      </p>

      <hr style={{ border: "none", borderTop: "1px solid #C9A46C", margin: "30px 0" }} />
      <p style={{ fontSize: "14px", color: "#777", textAlign: "center" }}>
        Sent automatically from{" "}
        <strong>The Art of Sensuality</strong> website.  
        <br />
        <a href="https://taosense.uk" style={{ color: "#C9A46C" }}>
          taosense.uk
        </a>{" "}
        | touch@taosense.uk
      </p>
    </div>
  );
}