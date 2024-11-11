"use client";
import './banner.css';
import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row, Carousel } from "react-bootstrap";

export default function HomePage() {
  const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
  const equipes = JSON.parse(localStorage.getItem("equipes")) || [];
  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  const Jogadores = JSON.parse(localStorage.getItem("Jogadores")) || [];
  const locaisdejogos = JSON.parse(localStorage.getItem("locaisdejogos")) || [];

  const lista = [
    {
      nome: "Equipamentos",
      imagem:
        "https://blog.tremeterra.com.br/wp-content/uploads/2018/12/242958-conheca-as-5-melhores-armas-para-airsoft-700x510.jpg",
      quantidade: equipamentos.length,
      link: "http://localhost:3000/equipamentos",
    },
    {
      nome: "Equipes",
      imagem:
        "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.6435-9/179195485_1402264543479113_3195058873807003418_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeH1EpH9n_FJ61GnBjqgFR7PCyqoUlM4VEkLKqhSUzhUSVG75K_di3lZ93xkhTjXIVlv1LZ7SCSMiYGYGDER5QmB&_nc_ohc=kao3ws8GbKQQ7kNvgGeTdM0&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A4Dz-3fp4wF7DDK2Olde35O&oh=00_AYDlxTaswqkaXyprhxyIRJxmXelhMqrsXll8pjaBuN2row&oe=6755005C",
      quantidade: equipes.length,
      link: "http://localhost:3000/equipes",
    },
    {
      nome: "Eventos",
      imagem:
        "https://airsoftzone.com.br/storage/AcN11LmV5A3FeCqaeIIfJLoCmGILel-metaV2hhdHNBcHAgSW1hZ2UgMjAyNC0wNy0wOCBhdCAxMS41Ni40Ny5qcGVn-.jpg",
      quantidade: eventos.length,
      link: "/eventos",
    },
    {
      nome: "Jogadores",
      imagem:
        "https://www.adrena.me/blog/wp-content/uploads/2020/01/Campo-de-Airsoft-e1582217047966-1200x675.jpg",
      quantidade: Jogadores.length,
      link: "http://localhost:3000/Jogadores",
    },
    {
      nome: "Locaisdejogos",
      imagem:
        "https://catracalivre.com.br/cdn-cgi/image/f=auto,q=60,width=960,height=99999,fit=scale-down/wp-content/uploads/2020/09/diversao-garantida-nas-ferias-do-hotel-terras-altas.jpeg",
      quantidade: locaisdejogos.length,
      link: "/locaisdejogos",
    },
  ];

  return (
    <Pagina>
      <header className="banner">
        {/* Remover a imagem do banner */}
      </header>

      {/* Carrossel menor e estreito */}
      <Carousel className="my-4 carousel-custom">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://images.squarespace-cdn.com/content/v1/564b4b09e4b082acc13d17e6/1569991734571-2D630SJXVYH7M6RS3RWQ/MSR.jpg?format=1500w"
            alt="Imagem de Airsoft 1"
          />
          <Carousel.Caption>
            <h3>Armas de Airsoft</h3>
            <p>Veja a seleção das melhores armas de Airsoft disponíveis.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://airsofts.com.br/wp-content/uploads/2021/08/BANNER_DESKTOP_1920x527-AIRSOFTS_OUT-2.jpg"
            alt="Imagem de Airsoft 2"
          />
          <Carousel.Caption>
            <h3>Equipamentos Táticos</h3>
            <p>Explore os equipamentos táticos para uma experiência imersiva.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://tubaraocenter.fbitsstatic.net/media/banner-airsoft.png?v=202410160851"
            alt="Imagem de Airsoft 3"
          />
          <Carousel.Caption>
            <h3>Campos de Jogo</h3>
            <p>Confira os melhores campos de airsoft para jogos intensos.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Cartões com links */}
      <Row md={4}>
        {lista.map((item) => (
          <Col className="py-3" key={item.nome}>
            <Card style={{ height: "100%" }}>
              <Card.Img src={item.imagem} style={{ height: "100%" }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className="text-end">
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
