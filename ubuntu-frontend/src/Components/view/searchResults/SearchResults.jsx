import { useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CustomCard from "../../cards/MicroEmpCard";
import { SearchContext } from '../../shared/searchContext/SearchContext';
import SearchBar from '../../searchBar/SearchBar';
import NoResultsCard from '../../cards/NoResultsCard';
import theme from '../../../theme/theme';


const SearchResults = () => {
    const { searchResults } = useContext(SearchContext);
    const filteredSearchResults = searchResults.filter(item => !item.managed);

    return (
        <>
                <Box 
                    sx={{ 
                        marginTop: '2vh', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent:'center', 
                        alignItems:'center'
                    }}>
                <SearchBar 
                    customStyles={{
                        boxShadow: 'none', 
                        backgroundColor: `${theme.palette.primary.grisClaro}`,
                        borderRadius: '100px',
                    }}/>
                <Typography 
                    sx={{
                        fontFamily: 'Lato',
                        fontWeight: 700,
                        fontSize: 24,
                        lineHeight: '30px',
                        marginTop: '5vh',
                        marginBottom: '3vh'
                    }}>
                    Resultados de tu búsqueda
                </Typography>
                {filteredSearchResults.length > 0 ? (
                    <Grid container spacing={2}>
                        {filteredSearchResults.map((result, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <CustomCard
                                    images={result.images.map((item) => item.url)}
                                    title={result.name}
                                    subtitle={result.subTitle}
                                    category={result.categoryDescription}
                                    location={result.provinceName.concat(", ", result.provinceCountryName)}
                                    details={result.description}
                                    moreInf={result.moreInformation}
                                    id={result.id}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <NoResultsCard />
                )}
            </Box>
        </>
    );
};

export default SearchResults;