
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={260}
        height={392}
        viewBox="0 0 260 392"
        backgroundColor="#ece1e1"
        foregroundColor="#ecebeb"

    >
        <rect x="9" y="1" rx="0" ry="0" width="250" height="250"/>
        <rect x="10" y="258" rx="0" ry="0" width="250" height="20"/>
        <rect x="10" y="270" rx="0" ry="0" width="180" height="20"/>
        <rect x="10" y="300" rx="0" ry="0" width="230" height="20"/>
        <rect x="11" y="330" rx="0" ry="0" width="60" height="20"/>
        <rect x="10" y="360" rx="0" ry="0" width="100" height="15"/>
    </ContentLoader>
)

export default Skeleton
