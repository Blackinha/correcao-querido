"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function LocalAirsoftFormPage(props) {
  // router -> hook para navegação de telas
  const router = useRouter();

  // Buscar a lista de locais de airsoft no localStorage, se não existir, inicializa uma lista vazia
  const locaisAirsoft = JSON.parse(localStorage.getItem("locaisAirsoft")) || [];

  // Recuperando id para edição da URL
  const id = props.searchParams?.id; // Verifique se o id está presente
  console.log(id);

  // Buscar na lista o local de airsoft com o ID recebido no parametro
  const localEditado = id ? locaisAirsoft.find((item) => item.id === id) : null;
  console.log(localEditado);

  // Função para salvar os dados do form
  function salvar(dados) {
    // Se localEditado existe, mudar os dados e gravar no localStorage
    if (localEditado) {
      Object.assign(localEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("locaisAirsoft", JSON.stringify(locaisAirsoft));
    } else {
      // se localEditado não existe, é criação de um novo
      // gerar um ID (Identificador único)
      dados.id = v4();
      // Adiciona o novo local na lista de locais de airsoft
      locaisAirsoft.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("locaisAirsoft", JSON.stringify(locaisAirsoft));
    }

    alert("Local de Airsoft criado com sucesso!");
    router.push("/locaisAirsoft");
  }

  // Campos do form e valores iniciais (default)
  const initialValues = {
    nome: "",
    endereco: "",
    tipo: "",
    capacidade: "",
    responsavel: "",
    cidade: "",
    estado: "",
    regras: "",
    comentarios: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo obrigatório"),
    capacidade: Yup.number().required("Campo obrigatório").min(1, "Capacidade deve ser maior que 0"),
    responsavel: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    regras: Yup.string().required("Campo obrigatório"),
    comentarios: Yup.string(),
  });

  return (
    <Pagina titulo={"Cadastro de Local de Airsoft"}>
      {/* Formulário */}
      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de localEditado
        // Se for novo, coloca o initialValues com os valores vazios
        initialValues={localEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Nome do Local:</Form.Label>
                    <Form.Control
                      name="nome"
                      type="text"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nome}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                      name="endereco"
                      type="text"
                      value={values.endereco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco && !errors.endereco}
                      isInvalid={touched.endereco && errors.endereco}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.endereco}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Tipo (CQB ou Campo Aberto):</Form.Label>
                    <Form.Control
                      name="tipo"
                      type="text"
                      value={values.tipo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.tipo && !errors.tipo}
                      isInvalid={touched.tipo && errors.tipo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tipo}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Capacidade:</Form.Label>
                    <Form.Control
                      name="capacidade"
                      type="number"
                      value={values.capacidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.capacidade && !errors.capacidade}
                      isInvalid={touched.capacidade && errors.capacidade}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.capacidade}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Responsável pelo Local:</Form.Label>
                    <Form.Control
                      name="responsavel"
                      type="text"
                      value={values.responsavel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.responsavel && !errors.responsavel}
                      isInvalid={touched.responsavel && errors.responsavel}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.responsavel}
                    </Form.Control.Feedback>
                  </Form.Group>

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
                </Row>

                <Row className="mb-2">
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

                  <Form.Group as={Col}>
                    <Form.Label>Regras Específicas:</Form.Label>
                    <Form.Control
                      name="regras"
                      as="textarea"
                      value={values.regras}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.regras && !errors.regras}
                      isInvalid={touched.regras && errors.regras}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.regras}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Comentários:</Form.Label>
                    <Form.Control
                      name="comentarios"
                      as="textarea"
                      value={values.comentarios}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.comentarios && !errors.comentarios}
                      isInvalid={touched.comentarios && errors.comentarios}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.comentarios}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/locaisAirsoft">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Form.Group>
              </Form>
            );
          }
        }
      </Formik>
    </Pagina>
  );
}