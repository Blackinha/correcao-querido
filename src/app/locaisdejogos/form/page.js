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

  // função para salvar os dados do form
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

                {/* Campos restantes... */}

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
