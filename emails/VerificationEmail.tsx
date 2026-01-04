import { Button, Font, Head, Heading, Html, Preview, Row, Section, Tailwind, Text } from "@react-email/components";


interface VerificationEmailProps{
    username:string;
    otp:string;
}

export default function VerificationEmail({username,otp}:VerificationEmailProps){
    return(
        <Tailwind>
            <Html lang="en" dir="ltr">
                <Head>
                    <Text className="text-3xl text-center font-extrabold text-blue-600">Verification Email</Text>
                </Head>
                <Preview>Here is your verifiction code: {otp}</Preview>
                <Section>
                    <Row>
                        <Heading as="h2" className="text-black font-bold" >Hello {username},</Heading>
                        <Text>
                            Thank you for registering. Please use the
                            following verification code to complete
                            registeration:
                        </Text>
                        <Text className="text-xl font-extrabold text-blue-500 "><span className="border px-6 py-2 rounded-lg">{otp}</span></Text>
                        <Text>You can also click on button to verify</Text>
                        <Button 
                        className="box-border w-full rounded-xl bg-indigo-600 px-3 py-3 text-center font-semibold text-white"
                        href={`${process.env.NEXTAUTH_URL}/verify/${username}?code=${otp}`}
                        >Click here to verify</Button>
                    </Row>
                    <Row>
                        <Text>If you did not request this code, please ignore this email</Text>
                    </Row>
                </Section>
            </Html>
        </Tailwind>
    )
}