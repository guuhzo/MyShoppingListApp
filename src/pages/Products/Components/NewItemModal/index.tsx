import React, { useState, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { v4 as uuid } from 'uuid'

import Realm from '../../../../services/database'

import Modal from '../../../../components/Modal'
import ItemNameInput from '../../../../components/ItemNameInput'
import {
  ModalContent,
  Title,
  ProductNameInputContainer
} from './styles'
import theme from '../../../../global/theme'

interface IProps {
  show: boolean;
  handleClose(): void //Promise<void>
}

const NewItemModal: React.FC<IProps> = ({ show, handleClose }) => {
  const [itemName, setItemName] = useState('')


  const handleSave = useCallback(() => {
    const random = uuid()
    const realm = Realm
    realm.write(() => {
      realm.create('Product', {
        _id: random,
        name: itemName,
        lastPrice: 0.00,
        createdAt: new Date()
      })
    })

    handleClose()
  }, [itemName])

  return (
    <Modal height='70%' show={show}>

        <Title>Create a new product</Title>
        <ModalContent>
          <TouchableOpacity style={{ margin: 16, marginBottom: 8 , width: 32 }} onPress={handleClose}>
            <Icon name='x' size={24} color={theme.colors.agnostic} />
          </TouchableOpacity>
          <ProductNameInputContainer>
            <ItemNameInput type='product' value={itemName} setValueInput={setItemName} />
            {itemName.length > 0 &&
              <TouchableOpacity onPress={handleSave}>
                <Icon name='check' size={24} color={theme.colors.primary} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            }
          </ProductNameInputContainer>
        </ModalContent>
    </Modal>

  )
}

export default NewItemModal