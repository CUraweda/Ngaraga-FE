import React, { useState } from "react";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate API call
    try {
      // In a real app, you would send the email to your API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <section className="py-16 md:py-24 bg-gray-900 rounded-2xl dark:bg-gray-900 p-5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden bg-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="h-full">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vq1SODNiBprs54kfstvygy3uyUL9QN.png"
                    alt="Astronaut reading a newspaper"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Join our weekly Update
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Get exclusive promotions & updates straight to your inbox.
                  </p>

                  {isSuccess ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                      <span className="block sm:inline">
                        Thanks for subscribing!
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                          <span className="block sm:inline">{error}</span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Your Email Address"
                          required
                          className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {isSubmitting ? "Subscribing..." : "Subscribe"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsletterSubscription;
