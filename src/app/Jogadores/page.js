"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function JogadoresPage() {
  const [Jogadores, setJogadores] = useState([]);

  useEffect(() => {
    const JogadoresLocalStorage = JSON.parse(localStorage.getItem("Jogadores")) || [];
    setJogadores(JogadoresLocalStorage);
  }, []);

  const excluir = (jogador) => {
    if (window.confirm(`Deseja realmente excluir o jogador ${jogador.nome}?`)) {
      const novaLista = Jogadores.filter((item) => item.id !== jogador.id);
      localStorage.setItem("Jogadores", JSON.stringify(novaLista));
      setJogadores(novaLista);
      alert("Jogador excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de Jogadores"}>
      <div className="text-end mb-2">
        <Button href="/Jogadores/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Equipe</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Experiência (anos)</th>
            <th>Tipo de Arma Preferida</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Jogadores.map((jogador) => (
            <tr key={jogador.id}>
              <td>{jogador.nome}</td>
              <td>{jogador.apelido}</td>
              <td>{jogador.equipe}</td>
              <td>{jogador.email}</td>
              <td>{jogador.telefone}</td>
              <td>{jogador.experiencia}</td>
              <td>{jogador.tipoArmaPreferida}</td>
              <td className="text-center">
                <Button className="me-2" href={`/Jogadores/form?id=${jogador.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(jogador)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="my-5">
        <img
          src="https://media.istockphoto.com/id/1308399725/pt/foto/four-fully-equipped-middle-aged-soldiers-in-camouflage-uniforms-form-a-line-ready-to-fire.jpg?s=612x612&w=0&k=20&c=Ds5GF6YVo8OmawaL2Eppff9Tlsm3R-0l8EBD3nY54sk="
          alt="Imagem de Airsoft"
          className="d-block w-100"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
    </Pagina>
  );
}
