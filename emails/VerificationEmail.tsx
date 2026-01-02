import { Font, Head, Heading, Html, Preview, Row, Section, Tailwind, Text } from "@react-email/components";


interface VerificationEmailProps{
    username:string;
    otp:string;
}

export default function VerificationEmail({username,otp}:VerificationEmailProps){
    return(
        <Tailwind>
            <Html lang="en" dir="ltr">
                <Head>
                    <Text className="text-2xl text-indigo-400">Verification Email</Text>
                </Head>
                <Preview>Here's your verifiction code: {otp}</Preview>
                <Section>
                    <Row>
                        <Heading as="h2">Hello {username}!,</Heading>
                    </Row>
                    <Row>
                        <Text>
                            Thank you for registering. Please use the
                            following verification code to complete
                            registeration:
                        </Text>
                    </Row>
                    <Row>
                        <Text>{otp}</Text>
                    </Row>
                    <Row>
                        <Text>If you did not request this code, please ignore the email</Text>
                    </Row>
                </Section>
            </Html>
        </Tailwind>
    )
}