import type { ReactNode } from "react";

export const PATIENT_PRIVACY_TITLE =
  "How we look after and safeguard information about you";

export const PATIENT_PRIVACY_INTRO =
  "Our pharmacists and their staff are members of your local healthcare team. They aim to provide you with the highest quality of healthcare. To do this they need to keep records about you, your health and the care we have provided or plan to provide to you. We know that you value your privacy and the security of personal information held about you.";

export interface PrivacySection {
  id: string;
  heading: string;
  body: ReactNode;
}

const linkClass = "text-primary underline underline-offset-2";

export const PATIENT_PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "information-recorded",
    heading: "Information recorded",
    body: (
      <>
        <p>
          As part of providing a professional, safe and efficient service, there
          is certain information that we record. This includes details of drugs
          and appliances dispensed against NHS prescriptions as well as
          significant advice given, referrals made to other health professionals
          and any other relevant information.
        </p>
        <p>The information recorded may include:</p>
        <ul>
          <li>
            basic details about you, such as address, date of birth, and next of
            kin;
          </li>
          <li>
            records of medicines you have been prescribed by your doctor or
            another qualified prescriber, and which have been supplied by this
            pharmacy;
          </li>
          <li>
            details of medicines purchased from the pharmacy without a
            prescription (&ldquo;over the counter medicines&rdquo;);
          </li>
          <li>other details and notes about your health and medical treatment;</li>
          <li>
            information relevant to your continued care from other people who
            care for you and know you well, such as other health professionals
            and relatives; and
          </li>
          <li>
            any other services we provide to you, for example, a flu
            vaccination.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "processing-information",
    heading: "Processing information",
    body: (
      <>
        <p>
          We process your personal data, which includes information related to
          prescriptions and any other pharmacy and health care services we
          provide to you (e.g. medicines reviews, vaccinations, stop smoking
          services etc.)
        </p>
        <p>We process your personal data for the purposes of:</p>
        <ul>
          <li>
            <strong className="text-foreground">Your care:</strong> providing
            pharmacy services and care to you and, as appropriate, receiving
            service and health records information if you have selected our
            pharmacy and sharing your information with your GP and others in the
            wider NHS;
          </li>
          <li>
            <strong className="text-foreground">Our payments:</strong> sharing
            your information with the NHS Business Services Authority, others in
            the wider NHS, and sometimes Local Authorities, and only limited
            information to those external to the NHS who negotiate and check the
            accuracy of our payments; and,
          </li>
          <li>
            <strong className="text-foreground">Management:</strong> sharing
            information with the NHS Business Services Authority, NHS England
            and others in the wider NHS, and sometimes Local Authorities; as
            well as those external to the NHS who ensure we maintain appropriate
            professional and service standards and that your declarations and
            ours are accurate.
          </li>
        </ul>
        <p>We hold your information for as long as advised by the NHS.</p>
        <p>
          We process your personal data in the performance of a task in the
          public interest for the provision of healthcare and treatment. A
          pharmacist is responsible for the confidentiality of your information.
        </p>
        <p>
          We may ask you whether you wish to choose our pharmacy to receive and
          process your future electronic prescriptions. If you choose to
          nominate our pharmacy you can still change or cancel your selection
          later by speaking to a pharmacy team member.
        </p>
        <p>
          When you contact us or use our digital services, we process the
          information you provide using secure IT systems. We use trusted
          technology suppliers who are required to meet data protection and
          security standards and only process data on our behalf.
        </p>
        <p>
          Our pharmacy professionals may consult relevant records to support
          your care, such as NHS summary care records or local shared care
          records. We align with NHS protocols for use of records. We may also
          ask you if, whilst you remain under our care, our pharmacy
          professionals can consult relevant records. If you allow us to see
          those health records this will help to ensure that relevant medical
          information is visible to our professionals.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>
          You have the right to confidentiality under the General Data
          Protection Regulation and data protection laws and the common law duty
          of confidence.
        </p>
        <p>
          We also comply with the NHS Code of Practice on Confidential
          Information and pharmacists have a requirement under their
          professional standards to keep records about you confidential, secure
          and accurate.
        </p>
        <p>
          All of our staff contracts of employment contain a requirement to keep
          patient information confidential.
        </p>
        <p>
          You may choose to opt out of the NHS using your data for planning and
          research purposes &ndash; details are obtained by:
        </p>
        <ul>
          <li>
            visiting{" "}
            <a
              href="https://www.nhs.uk/yournhsdatamatters/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              nhs.uk/yournhsdatamatters
            </a>{" "}
            website portal;
          </li>
          <li>using the NHS App;</li>
          <li>
            writing by post using the instructions at the web link above; or by
          </li>
          <li>
            calling the NHS England transformation directorate contact centre
            &mdash; 0300 303 5678 (open workdays Monday&ndash;Friday, 9am&ndash;5pm).
          </li>
        </ul>
        <p className="font-medium text-foreground">
          Our guiding principle is that we hold your records in strict
          confidence.
        </p>
      </>
    ),
  },
  {
    id: "view-your-record",
    heading: "Your right to view your health record",
    body: (
      <>
        <p>
          You have the right to ask for a copy of all pharmacy records about you
          (generally in paper or electronic form).
        </p>
        <p>
          Generally, there will be no charge for a printed copy of the
          information we hold about you. We are required to respond to your
          request within one month.
        </p>
        <p>
          You will need to give adequate information in order for pharmacy staff
          to identify you (for example, full name, address and date of birth).
          You will be required to provide ID, for example a passport, full
          driving licence or credit/debit card before any information is
          released to you.
        </p>
        <p>
          If you think any information we hold on you is inaccurate or
          incorrect, please let us know.
        </p>
        <p>You may object to us holding your information.</p>
        <p>
          You may lodge a complaint with the Information Commissioner&apos;s
          Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF.
        </p>
      </>
    ),
  },
  {
    id: "data-protection-officer",
    heading: "Our Data Protection Officer",
    body: (
      <p>
        Habib Jiwa
        <br />
        <a href="mailto:habib@pharmacy-clinic.com" className={linkClass}>
          habib@pharmacy-clinic.com
        </a>
      </p>
    ),
  },
];

export function PatientPrivacyBody({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="space-y-8">
      {PATIENT_PRIVACY_SECTIONS.map((section) => (
        <section key={section.id} id={section.id}>
          <Heading className="font-serif text-xl font-semibold text-primary">
            {section.heading}
          </Heading>
          <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground [&_ul]:space-y-2 [&_li]:ml-5 [&_li]:list-disc">
            {section.body}
          </div>
        </section>
      ))}
    </div>
  );
}
