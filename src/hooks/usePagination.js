import { useState } from 'react';

const usePagination = ({ deudores }) => {

  const [ currentPage, setCurrentPage ] = useState(0)
  const [search, setSearch ] = useState('');

  const filtrarDeudores = () => {

    if (search.length === 0) {
      return deudores.slice(currentPage, currentPage + 5);
    }
    const filtro = deudores.filter(deudor => deudor.nombre.includes(search));
    return filtro.slice( currentPage, currentPage + 5);
  }

  const nextPage = () => {
    if (
      deudores.filter((deudor) => deudor.nombre.includes(search)).length >
      currentPage + 5
    )
      setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = ({ target }) => {
    setSearch( target.value );
  }

  return [
    filtrarDeudores,
    nextPage,
    prevPage,
    onSearchChange
  ]
}

export default usePagination;