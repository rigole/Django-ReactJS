import react from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ children }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}