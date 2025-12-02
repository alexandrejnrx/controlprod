<template>
  <div class="container">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Cadastrar Cliente</h2>
      </div>

      <form>
        <div class="input-field">
          <label for="form.name">Nome do Cliente</label>
          <input type="text" />
        </div>

        <div class="input-field">
          <label for="clientType">Tipo de Cliente</label>
          <select>
            <option value="" disabled>Selecione um tipo</option>
            <option value="INTERNAL">Interno</option>
            <option value="EXTERNAL">Externo</option>
          </select>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="$emit('cancel')">Cancelar</button>
          <button type="submit" class="btn-submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 5px;
}

.modal-header h2 {
  color: var(--bg-color);
  margin: 0;
}

.input-field {
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
}

.input-field label {
  display: block;
  color: var(--bg-color);
  font-weight: bold;
  margin-bottom: 8px;
}

.input-field input,
.input-field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #9e9c9c;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.btn-cancel,
.btn-submit {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-right: 10px;
}

.btn-cancel {
  background-color: var(--btn-secondary-color);
  color: white;
}

.btn-submit {
  background-color: var(--btn-primary-color);
  color: white;
}
</style>
