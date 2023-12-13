// Importando as dependências do React e da API
"use client";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

//estrutura de um item de filme
interface Filmes {
  id: number;
  nome: string;
}

// Componente principal da página Home
export default function Home() {
  const [loading, setLoading]  = useState(false)
  const [textInput, setTexInput] = useState("")
  const [items, setItems] = useState<Filmes[]>([]);
  
  useEffect(() => {
    loadItems();
},[]);

useEffect(() => {
  console.log("O código está passando por aqui");// Mostra a mensagem no console ao mudar o texto de entrada
},[textInput])


  async function loadItems() {
    setLoading(true);

      try {
        const response = await api.get("/filmes");
        console.log(response);
        setItems(response.data);
        console.log("sucess:", response);
      }catch (error) {
          console.log("Erro:, erro");
        }finally{
          setLoading(false);
        }
    }

 async function handleAddItem(){  // Adiciona um novo item à lista
    console.log(textInput);
    const data = { nome: textInput};

    try {
      const response = await api.post('/filmes', data);
      loadItems();
      console.log(response);
      
    } catch (erro) {
      console.log("Erro:", erro)
    } 

  }
function handleDeleteItem (itemId: number){ // Função para lidar com a exclusão de um item da lista
  console.log(itemId)
}
  return ( // Apresentação do componente
    <main>

      <div>
        <input onChange={(e) => setTexInput(e.target.value)} placeholder="digite aqui" />
        <button onClick={handleAddItem}>Enviar</button>
      </div>

      <span>
        {loading && "Carregando..."}
      </span>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.nome}
          <button onClick = {() => handleDeleteItem(item.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
