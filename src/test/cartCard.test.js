import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import CartCard from '../components/Cart/CartCard'

const productMock = {
    id: "product001",
    title: 'Produto Legal',
    price: 120,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    quantity: 1
}

const removeFromCartMock = jest.fn()

describe("Testando o cartCard", () => {

    test('Deve renderizar a imagem, o título, o preço, a quantidade e o botão de remover', () => {

        
        render(<CartCard removeFromCart={removeFromCartMock} product={productMock}/>)

        const title = screen.getByRole('heading', {name: /produto legal/i})
        const price = screen.getByText(/\$120\.00/i)
        const buttonRemove = screen.getByRole('button', {name: /remove/i})
        const image = screen.getByRole('img', {name: /produto legal/i})
        const quantity = screen.getByText(/x1/i)

        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(buttonRemove).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(quantity).toBeInTheDocument()

        screen.logTestingPlaygroundURL()

    })


    test("Quando o botão remover for clicado, o item deve ser removido", async () => {
        const user = userEvent.setup()

        render(<CartCard removeFromCart={removeFromCartMock} product={productMock}/>)

        const buttonRemove = screen.getByRole('button', {name: /remove/i})

        await user.click(buttonRemove)

        expect(removeFromCartMock).toBeCalled()
    })
})