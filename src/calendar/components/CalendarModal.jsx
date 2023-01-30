
import { addHours } from 'date-fns';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal'
import styled from 'styled-components';
import { useUiStore, useCalendarStore } from '../../hooks';
import './CalendarModal.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        border: 'none',
        borderRadius: '13px',

        minHeight: '50%',
        maxHeight: '90%',

        // minWidth: '50%',
        maxWidth: '80%'
    },
};

const datetimeLocal = (date) => {
    const dt = date
    dt.setMinutes(dt.getMinutes());
    return dt.toISOString().slice(0, 16);
}

ReactModal.setAppElement('#root');


export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, addNewEvent, setActiveEvent } = useCalendarStore();
    // const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        start: new Date(),
        end: addHours(new Date(), 2),
        title: '',
        description: ''
    });

    useEffect(() => {
        if(!activeEvent) return
        setFormValues({...activeEvent})
    }, [activeEvent])
    


    const onCloseModal = () => {
        setActiveEvent(null);
        closeDateModal();
    }

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = ({ target }) => {

        if(target.name === 'end' && target.valueAsDate < formValues.start) return;

        setFormValues({
            ...formValues,
            [target.name]: target.valueAsDate
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        await addNewEvent(formValues);
        closeDateModal();
    }

    return (
        <ReactModal
            isOpen={isDateModalOpen}
            style={customStyles}
            onRequestClose={onCloseModal}
            contentLabel="Example Modal"
            overlayClassName={"modalBackground"}
            closeTimeoutMS={300}
        >
            <Title>New Event</Title>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <label htmlFor="">Start date and hour</label>
                    <input 
                        type={'datetime-local'} 
                        name="start" 
                        value={datetimeLocal(formValues.start)} 
                        onChange={onDateChange}
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="">End date and hour</label>
                    <input 
                        type={'datetime-local'} 
                        name="end" 
                        value={datetimeLocal(formValues.end)} 
                        onChange={onDateChange}
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="">Title</label>
                    <input 
                        type={'text'} 
                        name="title" 
                        value={formValues.title} 
                        onChange={onInputChange} 
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="">Description</label>
                    <textarea 
                        type={'text'} 
                        name="description" 
                        value={formValues.description} 
                        onChange={onInputChange} 
                        required
                    />
                </InputContainer>
                <ButtonsContainer>
                    <CancelButton type='button' onClick={onCloseModal}>Cancel</CancelButton>
                    <SaveButton type='submit'>Save</SaveButton>
                </ButtonsContainer>
            </FormContainer>
        </ReactModal>
    )
}

const Title = styled.h3`
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 10px;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    input, textarea{
        border: none;
        background-color: #e5e5e5;
        border-radius: 4px;
        padding: 5px;
        width: 100%;
        transition: all 0.2s ease-in-out;

        resize: vertical;

        &:focus {
            outline: none;
            background-color: #c8c8c8;
        }
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
`

const CancelButton = styled.button`
    border: 1.5px solid black;
    width: 100%;
    color: black;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    padding: 5px 10px;
`
const SaveButton = styled.button`
    border: none;
    width: 100%;
    color: white;
    border-radius: 6px;
    background-color: black;
    cursor: pointer;
    padding: 5px 10px;
`