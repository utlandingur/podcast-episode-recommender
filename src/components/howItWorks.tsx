import { cn } from "@/lib/utils";

export const HowItWorks = () => {
  return (
    <div className={cn("flex flex-col gap-8")}>
      <section id="faq" className={cn("m-y-2 flex flex-col gap-2")}>
        <h2>FAQs</h2>
        <div className={cn("flex flex-col gap-8")}>
          <div>
            <h3>How do I get ideas for my podcast?</h3>
            <p>
              Simply search for your podcast by name in the search bar above,
              and Podmore will analyze your show’s topics, trends, and listener
              interests to suggest new and engaging ideas for future episodes.
              It’s quick, easy, and designed to inspire your creativity.
            </p>
          </div>
          <div>
            <h3>What happens if I don’t see any suggestions?</h3>
            <p>
              If no recommendations are available or our servers experience
              heavy traffic, you might need to try again later. Podmore
              continuously updates its suggestions to ensure you always receive
              relevant ideas.
            </p>
          </div>
          <div>
            <h3>Is Podmore free to use?</h3>
            <p>
              Absolutely! Podmore is 100% free, giving you access to creative
              podcast ideas without any fees, subscriptions, or commitments.
            </p>
          </div>
          <div>
            <h3>How does Podmore come up with ideas?</h3>
            <p>
              Podmore analyzes your podcast’s niche, past episodes, and general
              trends in your category. By using this data, it recommends fresh
              topics, guest suggestions, or themes that align with your
              audience’s preferences.
            </p>
          </div>
        </div>
      </section>

      <section id="benefits" className={cn("m-y-2 flex flex-col ")}>
        <h2>Why Use Podmore?</h2>
        <ul className={cn("flex flex-col gap-4 pt-4")}>
          <li>
            Save time brainstorming with AI-powered episode ideas tailored to
            your podcast.
          </li>
          <li>
            Stay ahead of trends by exploring suggestions based on popular and
            emerging topics.
          </li>
          <li>
            Keep your audience engaged with fresh and creative content ideas.
          </li>
          <li>
            Receive inspiration for potential guests, interview topics, or
            discussion points.
          </li>
          <li>
            Podmore is free, fast, and easy to use — no technical expertise
            required.
          </li>
          <li>
            If traffic is high, try again later — new recommendations are
            generated regularly.
          </li>
        </ul>
      </section>
    </div>
  );
};
