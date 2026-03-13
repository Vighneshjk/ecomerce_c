import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components'
import * as React from 'react'

interface OrderConfirmationProps {
    orderId: string
    customerName: string
    items: any[]
    total: number
}

export const OrderConfirmation = ({
    orderId = 'AKL-123456',
    customerName = 'Valued Customer',
    items = [],
    total = 0,
}: OrderConfirmationProps) => (
    <Html>
        <Head />
        <Preview>Order Confirmed — {orderId} | Akela Eyewear</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Img
                        src="https://akela.in/logo-dark.png"
                        width="120"
                        height="40"
                        alt="Akela"
                        style={logo}
                    />
                </Section>

                <Section style={content}>
                    <Heading style={h1}>Vision Secured.</Heading>
                    <Text style={text}>
                        Hello {customerName}, your artisan order **{orderId}** is confirmed and entering the calibration phase.
                    </Text>

                    <Section style={orderBox}>
                        {items.map((item, i) => (
                            <Row key={i} style={itemRow}>
                                <Column style={itemInfo}>
                                    <Text style={itemName}>{item.name}</Text>
                                    <Text style={itemSub}>{item.color} | Qty: {item.quantity}</Text>
                                </Column>
                                <Column style={itemPrice}>
                                    <Text style={priceText}>₹{item.price}</Text>
                                </Column>
                            </Row>
                        ))}
                        <Hr style={hr} />
                        <Row>
                            <Column>
                                <Text style={totalLabel}>TOTAL YIELD</Text>
                            </Column>
                            <Column align="right">
                                <Text style={totalValue}>₹{total}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Link href="https://akela.in/account/orders" style={button}>
                        Track Order Pulse
                    </Link>

                    <Text style={footer}>
                        Handcrafted in India. Akela Eyewear Studio.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
)

const main = {
    backgroundColor: '#0d0d0d',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
    margin: '0 auto',
    padding: '40px 0',
    width: '580px',
}

const header = {
    backgroundColor: '#141414',
    padding: '40px',
    textAlign: 'center' as const,
}

const content = {
    padding: '40px',
    backgroundColor: '#0d0d0d',
}

const logo = {
    margin: '0 auto',
}

const h1 = {
    color: '#FFD700',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    marginBottom: '30px',
}

const text = {
    color: '#999',
    fontSize: '16px',
    lineHeight: '26px',
    textAlign: 'center' as const,
}

const orderBox = {
    backgroundColor: '#141414',
    padding: '30px',
    borderRadius: '24px',
    marginTop: '30px',
    border: '1px solid #ffffff05'
}

const itemRow = {
    marginBottom: '10px'
}

const itemInfo = {
    textAlign: 'left' as const
}

const itemPrice = {
    textAlign: 'right' as const
}

const itemName = {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0'
}

const itemSub = {
    color: '#666',
    fontSize: '12px',
    margin: '0'
}

const priceText = {
    color: '#FFD700',
    fontSize: '14px',
    fontWeight: 'bold'
}

const hr = {
    borderColor: '#ffffff10',
    margin: '20px 0'
}

const totalLabel = {
    color: '#666',
    fontSize: '12px',
    fontWeight: 'bold'
}

const totalValue = {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold'
}

const button = {
    backgroundColor: '#FFD700',
    borderRadius: '12px',
    color: '#000',
    display: 'block',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    textDecoration: 'none',
    width: '100%',
    padding: '20px',
    marginTop: '40px',
}

const footer = {
    color: '#444',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '40px',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px'
}
