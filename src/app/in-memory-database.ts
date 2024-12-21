import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.model";
import { Entry } from "./pages/entries/shared/entry.model";
export class inMemoryDatabase implements InMemoryDbService {

  createDb(){
    const categories: Category[] = [
      {id: 1, name: "Moradia", description: "Pagamentos de contas da Casa"},
      {id: 2, name: "Saúde", description: "Plano de Saúde e Remédios"},
      {id: 3, name: "Lazer", description: "Cinema, parques, praia, etc"},
      {id: 4, name: "Salário", description: "Recebimento de Salário"},
      {id: 5, name: "Freelas", description: "Trabalhos como freelancer"},
    ];

    const entries: Entry[] = [
      {id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, category:categories[0], paid: true, date: "14/10/2024", amount: "70.80", type: "expense", description:"gás botijão 13kg Copagas"} as Entry,
      {id: 2, name: 'Suplementos', categoryId: categories[1].id, category:categories[1], paid: false, date: "14/10/2024", amount: "15,00", type: "expense", description:"Academia"} as Entry,
      {id: 3, name: 'Salário na Empresa X', categoryId: categories[3].id, category:categories[3], paid: true, date: "14/10/2024", amount: "70,80", type: "entrada", description:"receita"} as Entry,
      {id: 4, name: 'Aluguel de Filme', categoryId: categories[2].id, category:categories[2], paid: false, date: "15/10/2024", amount: "4405,80", type: "revenue", description:"entrada"} as Entry,
      {id: 5, name: 'Suplementos', categoryId: categories[1].id, category:categories[1], paid: false, date: "14/10/2024", amount: "70,80", type: "expense", description:""} as Entry,
      {id: 6, name: 'Video Game da Filha', categoryId: categories[2].id, category:categories[2], paid: true, date: "16/10/2024", amount: "15,00", type: "expense", description:""} as Entry,
      {id: 7, name: 'Uber', categoryId: categories[1].id, category:categories[1], paid: false, date: "16/10/2024", amount: "30,90", type: "expense", description:""} as Entry,
      {id: 8, name: 'Aluguel', categoryId: categories[2].id, category:categories[2], paid: false, date: "17/10/2024", amount: "18,50", type: "expense", description:""} as Entry,
      {id: 9, name: 'Gás de Cozinha', categoryId: categories[1].id, category:categories[1], paid: true, date: "23/10/2024", amount: "50,20", type: "expense", description:""} as Entry,
      {id: 10, name: 'Pagamento pelo Projeto XYZ', categoryId: categories[4].id, category:categories[4], paid: true, date: "25/10/2024", amount: "2980,00", type: "revenue", description:""} as Entry,
      {id: 11, name: 'Cinema', categoryId: categories[2].id, category:categories[2], paid: false, date: "07/10/2024", amount: "30,50", type: "expense", description:""} as Entry,
      {id: 12, name: 'Jantar/Almoço fora', categoryId: categories[1].id, category:categories[1], paid: false, date: "17/10/2024", amount: "40,20", type: "expense", description:""} as Entry,
      {id: 13, name: 'Bebidas', categoryId: categories[2].id, category:categories[2], paid: true, date: "18/10/2024", amount: "80,0", type: "expense", description:""} as Entry,
      {id: 14, name: 'Happy Hour', categoryId: categories[1].id, category:categories[1], paid: true, date: "21/10/2024", amount: "10,70", type: "expense", description:""} as Entry,
      {id: 15, name: 'Presente', categoryId: categories[2].id, category:categories[2], paid: true, date: "28/10/2018", amount: "14,20", type: "expense", description:""} as Entry,
      {id: 16, name: 'Academia', categoryId: categories[1].id, category:categories[1], paid: true, date: "28/10/2024", amount: "18,50", type: "expense", description:""} as Entry,

    ];
    return { categories, entries}

  }
}
