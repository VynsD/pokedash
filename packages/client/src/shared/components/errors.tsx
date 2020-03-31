import React from 'react';
import * as ANTD from 'antd';
import egg from '../../assets/img/egg.svg';

function ErrorNotFound(props: any) {
  return (
    <div className="grid-onlyElement">
      <ANTD.Alert.ErrorBoundary>
        <div className="error-wrapper">
          <h3 className="error-header">
            {props.reserchType === 'ByType' ? 'Errore: Nessun Pokémon trovato' : 'Errore: Pokémon non trovato'}
          </h3>
          <div className="error-message">
            <span>
              {props.reserchType === ' ByType' ? 'Non è stato possibile trovare alcun' : 'Non è stato possibile trovare il'}
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
  );
}

export default ErrorNotFound;