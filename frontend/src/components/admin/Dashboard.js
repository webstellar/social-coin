import React, { Fragment, useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { Container, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getAdminHeroes } from "../../actions/heroActions";
import { getAdminAppreciations } from "../../actions/appreciationActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { heroes } = useSelector((state) => state.heroes);
  const { appreciations } = useSelector((state) => state.appreciations);

  useEffect(() => {
    dispatch(getAdminHeroes());
    dispatch(getAdminAppreciations());
  }, [dispatch]);

  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={4} md={2}>
            <AdminSideBar />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
