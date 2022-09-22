import SearchBar from "../features/SearchBar";

function Index({ neighborhoods }) {
  return <div className="flex flex-col p-5 md:p-7">  
    <div className="basis-full">
      <h2 className="text-3xl">
        Welcome
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis tempore aperiam odit voluptatibus velit qui optio quam exercitationem incidunt animi rem voluptate necessitatibus, nostrum obcaecati enim, ullam itaque et pariatur.
      </p>
      <SearchBar
        neighborhoods={neighborhoods}
      />
    </div>
    <div className="basis-full">
      <h1 className="text-xl">Explore</h1>
      <p className="pb-4">Maps and statistics illustrate each district’s built environment, socio‑economic, and demographic characteristics. Dynamic charts compare conditions across districts.</p>
      <h1 className="text-xl">Learn</h1>
      <p className="pb-4">Each community district is unique. Find out about your community board's budget priorities and most pressing concerns, and learn about the projects and neighborhood studies that are happening in your district.</p>
      <h1 className="text-xl">Download</h1>
      <p className="pb-4">Each profile's indicators, land use and zoning data, and more are available for your use and analysis.</p>
    </div>
  </div>
}

export default Index;
