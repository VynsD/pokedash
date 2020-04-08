import React from 'react';
import * as ANTD from 'antd';
import egg from '../../assets/img/egg.svg';

// const
type PropsState = {
  reserchType: string,
  typeData?: string
}

function ErrorNotFound(props: PropsState) {
  return (
    props.typeData ? (
      props.typeData === 'description' ? (
        <ANTD.Alert.ErrorBoundary>
          <div className="error-wrapper">
            <div className="error-message">
              <span>Non è stato possibile trovare il Pokémon ricercato.</span>
              <span>Riprova tra poco!</span>
            </div>
          </div>
        </ANTD.Alert.ErrorBoundary>
      ) : (
          <ANTD.Alert.ErrorBoundary>
            <div className="error-wrapper">
              <h6 className="error-header">
                <span>Errore:</span>
                <span>Pokémon non trovato</span>
              </h6>
              <img
                src={egg}
                alt="pokemon not found"
                className="error-img"
              />
            </div>
          </ANTD.Alert.ErrorBoundary>
        )
    ) : (
        <div className="grid-onlyElement">
          <ANTD.Alert.ErrorBoundary>
            <div className="error-wrapper">
              <h3 className="error-header">
                {props.reserchType === 'ByType' ? 'Errore: Nessun Pokémon trovato' : 'Errore: Pokémon non trovato'}
              </h3>
              <div className="error-message">
                <span>
                  {props.reserchType === 'ByType' ? 'Non è stato possibile trovare alcun' : 'Non è stato possibile trovare il'}
                </span>
                <span>
                  {props.reserchType === 'ByType' ? 'Pokémon del tipo selezionato.' : 'Pokémon ricercato.'}
                </span>
                <span>Riprova tra poco!</span>
                <img
                  src={egg}
                  alt="pokemon not found"
                  className="error-img"
                />
              </div>
            </div>
          </ANTD.Alert.ErrorBoundary>
        </div>
      )
  );
}

export default ErrorNotFound;
