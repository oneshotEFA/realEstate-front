import Placeholder from "@/components/ui/placeHolder";

const Contact = () => (
  <section className="pt-32 px-4 md:px-8 pb-28 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADING */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold">CONTACT US</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2">
            Let’s Connect With Ayele Homes
          </h1>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
            Have questions about buying, selling, renting, or our services?  
            Get in touch — our team will respond as quickly as possible.
          </p>
        </div>

        {/* GRID: COMPANY INFO + FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* LEFT: COMPANY DETAILS */}
          <div className="space-y-10">
            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Contact Information
              </h3>

              <div className="space-y-4 text-foreground/70">
                <p>
                  📞 <strong>+251 977-32-52-96</strong>
                </p>
                <p>
                  ✉️ <strong>ikirubelayele2127@gmail.com</strong>
                </p>
                <p>
                  📍 <strong>Gerji, Addis Ababa, Ethiopia</strong>
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Office Hours
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Monday - Friday: <strong>9:00 AM – 6:00 PM</strong> <br />
                Saturday: <strong>10:00 AM – 4:00 PM</strong> <br />
                Sunday: <strong>Closed</strong>
              </p>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-border shadow-md">
              <iframe
                src="https://maps.google.com/maps?q=addis%20ababa&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[280px]"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="bg-white p-10 rounded-3xl border border-border shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send Us a Message</h3>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-foreground/70 font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full mt-2 p-4 border border-border rounded-xl focus:border-primary outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-foreground/70 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-2 p-4 border border-border rounded-xl focus:border-primary outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-foreground/70 font-medium">Subject</label>
                <input
                  type="text"
                  className="w-full mt-2 p-4 border border-border rounded-xl focus:border-primary outline-none"
                  placeholder="What is your inquiry about?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-foreground/70 font-medium">Message</label>
                <textarea
                  rows={5}
                  className="w-full mt-2 p-4 border border-border rounded-xl focus:border-primary outline-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Button */}
              <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
);

export default Contact;
