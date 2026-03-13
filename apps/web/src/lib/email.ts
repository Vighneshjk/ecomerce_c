import { Resend } from 'resend'
import React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({
    to,
    subject,
    react,
}: {
    to: string
    subject: string
    react: React.ReactElement
}) => {
    try {
        const data = await resend.emails.send({
            from: 'Akela Eyewear <hello@akela.in>',
            to,
            subject,
            react,
        })
        return { success: true, data }
    } catch (error) {
        console.error('Email transmission failed:', error)
        return { success: false, error }
    }
}
