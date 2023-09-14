import { render, screen } from "@testing-library/react"
import ProductCard from "../components/ProductsList/ProductCard"
import userEvent from '@testing-library/user-event'

const addToCartMock = jest.fn()

const productMock = [
    {
        id: "product001",
        title: 'Produto Legal',
        price: 120,
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    }
]

describe("Testando o product card", () => {

    test("Deve renderizar o product card", () => {
        render(<ProductCard
            addToCart={addToCartMock}
            product={productMock[0]}
            />)

            screen.logTestingPlaygroundURL()
    })

    test("Deve renderizar a imagem, o título, o preço e o botão de comprar", () => {

        render(<ProductCard addToCart={addToCartMock} product={productMock[0]}/>)

        const title = screen.getByRole('heading', {name: /produto legal/i})
        const price = screen.getByText(/\$120\.00/i)
        const buttonBuy = screen.getByText(/\$120\.00/i)
        const image = screen.getByRole('img', {name: /produto legal/i})

        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(buttonBuy).toBeInTheDocument()
        expect(image).toBeInTheDocument()

        screen.logTestingPlaygroundURL()
    })

    test("Deve disparar a função addCard quando for clicada", async () => {

        const user = userEvent.setup()

        render(<ProductCard addToCart={addToCartMock} product={productMock[0]}/>)

        const buttonBuy = screen.getByRole('button', {name: /buy/i})

        await user.click(buttonBuy)

        expect(addToCartMock).toBeCalled()

        expect(addToCartMock).toHaveBeenCalledWith(productMock[0])
    })

})