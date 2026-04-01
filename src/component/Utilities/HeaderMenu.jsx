const HeaderMenu = ({ title }) => {
  return (
    <div>
      <div className="p-8">
        <p className="text-center text-2xl font-semibold text-anime-primary">
          {title}
        </p>
      </div>
    </div>
  );
};

export default HeaderMenu;
