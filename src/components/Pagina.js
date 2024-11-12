"use client";

import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/equipamentos">Equipamentos</Nav.Link>
            <Nav.Link href="/equipes">Equipes</Nav.Link>
            <Nav.Link href="/eventos">Eventos</Nav.Link>
            <Nav.Link href="/Jogadores">Jogadores</Nav.Link>
            <Nav.Link href="/locaisdejogos">Locais de jogos</Nav.Link>
          </Nav>

          {/* Barra de Pesquisa */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Pesquisar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Buscar</Button>
          </Form>
        </Container>
      </Navbar>

      {/* Conteudo da Página */}
      <Container className="mt-2">{children}</Container>
    </>
  );
}
