"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);

  // Carrega os eventos quando a tela é acessada
  useEffect(() => {
    const eventosLocalStorage = JSON.parse(localStorage.getItem("eventos")) || [];
    setEventos(eventosLocalStorage);
    console.log(eventosLocalStorage);
  }, []);

  // Função para exclusão de um evento
  function excluir(evento) {
    if (window.confirm(`Deseja realmente excluir o evento ${evento.nome}?`)) {
      const novaLista = eventos.filter((item) => item.id !== evento.id);
      localStorage.setItem("eventos", JSON.stringify(novaLista));
      setEventos(novaLista);
      alert("Evento excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Eventos"}>
      <div className="text-end mb-2">
        <Button href="/eventos/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os eventos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Evento</th>
            <th>Data</th>
            <th>Local</th>
            <th>Organizador</th>
            <th>Equipes Participantes</th>
            <th>Regras</th>
            <th>Observações</th>
            <th>Tipo de Evento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.nome}</td>
              <td>{evento.data}</td>
              <td>{evento.local}</td>
              <td>{evento.organizador}</td>
              <td>{evento.equipesParticipantes}</td>
              <td>{evento.regras}</td>
              <td>{evento.observacoes}</td>
              <td>{evento.tipoEvento}</td>
              <td className="text-center">
                <Button className="me-2" href={`/eventos/form?id=${evento.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(evento)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
