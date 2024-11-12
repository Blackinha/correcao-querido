"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function equipamentosPage() {
  const [equipamentos, setequipamentos] = useState([]);

  useEffect(() => {

    const equipamentosLocalStorage =
      JSON.parse(localStorage.getItem("equipamentos")) || [];

    setequipamentos(equipamentosLocalStorage);
    console.log(equipamentosLocalStorage);
  }, []);


  function excluir(equipamento) {

    if (window.confirm(`Deseja realmente excluir o equipamento ${equipamento.nome}?`)) {

      const listaEquipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];


      const novaLista = listaEquipamentos.filter((item) => item.id !== equipamento.id);


      localStorage.setItem("equipamentos", JSON.stringify(novaLista));


      setequipamentos(novaLista);

      alert("Equipamento excluído com sucesso!");
    }
  }


  return (
    <Pagina titulo={"Lista de equipamentos"}>
      <div className="text-end mb-2">
        <Button href="/equipamentos/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Equipamento</th>
            <th>Tipo</th>
            <th>Fabricante</th>
            <th>Proprietário</th>
            <th>Condição</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((equipamentos) => {
            return (
              <tr>
                <td>{equipamentos.nome}</td>
                <td>{equipamentos.tipo}</td>
                <td>{equipamentos.fabricante}</td>
                <td>{equipamentos.proprietário}</td>
                <td>{equipamentos.condição}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/equipamentos/form?id=${equipamentos.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(equipamentos)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="my-5">
        <img
          src="https://blog.lazereaventura.com.br/wp-content/uploads/2019/02/como_fazer_a_limpeza_e_manuten%C3%A7%C3%A3o_da_arma_de_airsoft_lazer_e_aventura_shop-810x540.jpg"
          alt="Imagem de Airsoft"
          className="d-block w-100"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
    </Pagina>
  );
}
