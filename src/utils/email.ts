import nodemailer from "nodemailer";
import Email from "email-templates";
import path from "path";

const template = new Email({
  message: {
    from: `FROM <${process.env.GOOGLE_EMAIL_ID}>`
  },
  transport: {
    jsonTransport: true
  },
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.join(__dirname, "../templates"),
      images: true
    }
  },
  views: {
    options: {
      extension: "ejs"
    }
  },
});

const sendMail = (email: { to: string, subject: string; html: string }) => {
  return new Promise((resolve) => {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL_ID,
        pass: process.env.GOOGLE_EMAIL_PWD
      }
    });
  
    transport.sendMail(email, (err) => {
      transport.close();
      console.log(err);

      if (err) resolve(false);
      else resolve(true);
  
    });
  })
};

export const sendSecretMail = async (address: string[], secret: string) => {
  const html = await template.render(path.join(__dirname, "../templates/welcome.ejs"), { secret });

  const email = {
    to: address.join(","),
    subject: "[test] 인증 메일입니다.",
    html
  };

  return sendMail(email);
};
