import React from 'react';

const Ant = ({name,length,color,weight,winChance,progress}) => {
  return (
    <tbody>
      <tr key={name}>
        <td>{name}</td>
        <td>{length}</td>
        <td>{color}</td>
        <td>{weight}</td>
        <td>{winChance}</td>
        <td>{progress}</td>
      </tr>
    </tbody>
  );
}

export default Ant;