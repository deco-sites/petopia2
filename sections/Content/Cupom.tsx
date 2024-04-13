export interface Props {
  /**
   * @title Código do cupom
   */
  cod: string;
  /**
   * @title titulo pricipal
   */
  title: string;
  /**
   * @title uma descrição curta
   */
  description: string;
}

export default function Cupom(props: Props) {
  return (
    <>
      <div className="hero min-h-screen bg-secondary">
        <div className="hero-content text-center flex-col">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{props.title}</h1>
            <p className="py-6">{props.description}</p>
          </div>
          <label htmlFor="my_modal_7" className="btn bg-accent">
            Pegar Cupom
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Aqui está seu cupom 🥰</h3>
              <p className="py-4">{props.cod}</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Fechar
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
