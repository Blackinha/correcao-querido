"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function EquipesFormPage(props) {
  const router = useRouter();

  // Supondo que você tenha os jogadores no localStorage, se não, vamos gerar 20 fictícios
  const jogadores = JSON.parse(localStorage.getItem("jogadores")) || Array.from({ length: 20 }, (_, i) => ({
    id: v4(),
    nome: `Jogador ${i + 1}`,
  }));
  const equipes = JSON.parse(localStorage.getItem("equipes")) || [];

  const id = props.searchParams.id;
  const equipeEditada = equipes.find((item) => item.id == id);

  function salvar(dados) {
    if (equipeEditada) {
      Object.assign(equipeEditada, dados);
      localStorage.setItem("equipes", JSON.stringify(equipes));
    } else {
      dados.id = v4();
      equipes.push(dados);
      localStorage.setItem("equipes", JSON.stringify(equipes));
    }

    alert("Equipe salva com sucesso!");
    router.push("/equipes");
  }

  const initialValues = {
    nomeEquipe: "",
    capitao: "",
    membros: "",
    dataFundacao: "",
    cidade: "",
    estado: "",
    numeroVitorias: "",
    descricao: "",
    eventos: "",
  };

  const validationSchema = Yup.object().shape({
    nomeEquipe: Yup.string().required("Campo obrigatório"),
    capitao: Yup.string().required("Campo obrigatório"),
    membros: Yup.string().required("Campo obrigatório"),
    dataFundacao: Yup.date().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    numeroVitorias: Yup.number().min(0, "Número inválido").required("Campo obrigatório"),
    descricao: Yup.string(),
    eventos: Yup.string(),
  });

  return (
    <Pagina titulo="Cadastro de Equipes">
      <Formik
        initialValues={equipeEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome da Equipe:</Form.Label>
                <Form.Control
                  name="nomeEquipe"
                  type="text"
                  value={values.nomeEquipe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nomeEquipe && !errors.nomeEquipe}
                  isInvalid={touched.nomeEquipe && errors.nomeEquipe}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nomeEquipe}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Capitão:</Form.Label>
                <Form.Select
                  name="capitao"
                  value={values.capitao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.capitao && !errors.capitao}
                  isInvalid={touched.capitao && errors.capitao}
                >
                  <option value="">Selecione o Capitão</option>
                  {jogadores.map((jogador) => (
                    <option key={jogador.id} value={jogador.id}>
                      {jogador.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.capitao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Membros (IDs separados por vírgula):</Form.Label>
                <Form.Control
                  name="membros"
                  type="text"
                  value={values.membros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.membros && !errors.membros}
                  isInvalid={touched.membros && errors.membros}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.membros}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data de Fundação:</Form.Label>
                <Form.Control
                  name="dataFundacao"
                  type="date"
                  value={values.dataFundacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataFundacao && !errors.dataFundacao}
                  isInvalid={touched.dataFundacao && errors.dataFundacao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataFundacao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  name="cidade"
                  type="text"
                  value={values.cidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cidade && !errors.cidade}
                  isInvalid={touched.cidade && errors.cidade}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cidade}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Estado:</Form.Label>
                <Form.Control
                  name="estado"
                  type="text"
                  value={values.estado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.estado && !errors.estado}
                  isInvalid={touched.estado && errors.estado}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.estado}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Número de Vitórias:</Form.Label>
                <Form.Control
                  name="numeroVitorias"
                  type="number"
                  min={0}
                  value={values.numeroVitorias}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.numeroVitorias && !errors.numeroVitorias}
                  isInvalid={touched.numeroVitorias && errors.numeroVitorias}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numeroVitorias}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricao"
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>Eventos:</Form.Label>
              <Form.Control
                type="text"
                name="eventos"
                value={values.eventos}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="text-end">
              <Button className="me-2" href="/equipamentos">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}