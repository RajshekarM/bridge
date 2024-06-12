// src/pages/Home.js

import elonmusk from '../assets/elonmusk.jpg' 

const Home = () => {
  return (
    <div className="pt-20">
      <section className="bg-gray-100 text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Hey there. It's an awesome day.</h1>
        <h2 className="font-bold mb-4">Small Quote : "Failure is stepping stone of the success"</h2>
        <p className="text-xl mb-8">Software Engineer | Web Developer | AI Developer | Designer | Writer</p>
        <div className="flex justify-center space-x-4">
          <a href="/tech" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tech Page</a>
          <a href="/career" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Professional Career</a>
          <a href="/personal" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">Personal</a>
        </div>
      </section>
      <section className="container mx-auto my-20">
        <h2 className="text-3xl font-bold text-center mb-10">About Me</h2>
        <div className="flex flex-col items-center">
          <img src={elonmusk} alt="Your Photo" className="rounded-full w-40 h-40 mb-6"/>
          <p className="text-center max-w-prose">Hi, I'm Rajashekar, a web developer and designer...</p>
        </div>
      </section>
      <section className="container mx-auto my-20">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Projects/Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-xl font-bold mb-2">Tech Highlight 1</h3>
            <p className="mb-4">Brief description...</p>
            <a href="/tech" className="text-blue-500 hover:underline">Read more</a>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-xl font-bold mb-2">Career Highlight 1</h3>
            <p className="mb-4">Brief description...</p>
            <a href="/career" className="text-blue-500 hover:underline">Read more</a>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-xl font-bold mb-2">Personal Highlight 1</h3>
            <p className="mb-4">Brief description...</p>
            <a href="/personal" className="text-blue-500 hover:underline">Read more</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
