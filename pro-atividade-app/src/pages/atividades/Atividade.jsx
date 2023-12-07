import { useEffect, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import AtividadeForm from './AtividadeForm';
import AtividadeLista from './AtividadeLista';
import api from '../../api/atividade'
import TitlePages from '../../components/TitlePages';

function Atividade() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id:0});

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined)
    {
      const atividade = atividades.filter(
        (atividade) => atividade.id === id
      );
      setAtividade(atividade[0]);
    }
    else{
      setAtividade({id: 0});
    }
    setSmShowConfirmModal(!smShowConfirmModal);  
  }; 

  const getAllAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  };

  const newAtividade = () => {
    setAtividade({id:0});
    handleAtividadeModal();
  }

  useEffect(() => {
      const getAtividades = async () => {
        const allAtividades = await getAllAtividades();
        if (allAtividades) setAtividades(allAtividades);
      }
      getAtividades();
   }, [])

  const addAtividade = async (ativ) => {
    handleAtividadeModal();
    const response = await api.post('atividade', ativ)
    console.log(response.data);
    setAtividades([...atividades, response.data]);
  }

  const cancelarAtividade = () => {
    setAtividade({id:0});
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ) =>{
    handleAtividadeModal();
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;

    setAtividades
    (
      atividades.map(item => item.id === id ? response.data : item)
    )
    setAtividade({id: 0});
  }

  const deletarAtividades = async (id) => {
    handleConfirmModal(0);
    await (api.delete(`atividade/${id}`))
    {
        const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
        setAtividades([...atividadesFiltradas]);
    }
  }

  function editarAtividade(id){
    const atividade = atividades.filter(atividade => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  return (
    <>
    <TitlePages title={'Atividade ' + (atividade.id !== 0 ? atividade.id : '' )}>
      <Button variant="outline-secondary" onClick={newAtividade}>
          <i className='fas fa-plus' />
      </Button>
    </TitlePages>

    <AtividadeLista 
      atividades={atividades}
      editarAtividade={editarAtividade}
      handleConfirmModal={handleConfirmModal}
    />

    <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Atividades {atividade.id !== 0 ? atividade.id : '' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <AtividadeForm 
          addAtividade={addAtividade}
          cancelarAtividade={cancelarAtividade}
          atualizarAtividade={atualizarAtividade}
          atividadeSelecionada={atividade}
          atividades={atividades}
        />
      </Modal.Body>
    </Modal>

    <Modal
        size='sm'
        show={smShowConfirmModal}
        onHide={handleConfirmModal}
      >
      <Modal.Header closeButton>
        <Modal.Title>
          Excluindo Atividade{' '}
          {atividade.id !== 0 ? atividade.id : '' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          Tem certeza que deseja Excluir a Atividade {atividade.id}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
          <button 
            className='btn btn-sm btn-outline-success me-2' 
            onClick={() => deletarAtividades(atividade.id)}
          >
            <i className='fas fa-check me-2'></i>
              Sim
          </button>
          <button 
            className='btn btn-sm btn-danger' 
            onClick={() => handleConfirmModal(0)}
          >
            <i className='fas fa-times me-2'></i>
              Não
          </button>
      </Modal.Footer>
    </Modal>

    </>
  );
}

export default Atividade;
