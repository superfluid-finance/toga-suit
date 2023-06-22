const AddressAvatar = ({ ensImage, size = 0 }) => {
    return ensImage ? (
      <img
        src={ensImage}
        width={size}
        height={size}
        style={{ borderRadius: 999 }}
      />
    ) : (
      <div
        style={{
          height: 75,
          width: 75,
          alignItems: "center",
          display:"contents"
        }}
      >
        🙀
      </div>
    );
  };

export default AddressAvatar;