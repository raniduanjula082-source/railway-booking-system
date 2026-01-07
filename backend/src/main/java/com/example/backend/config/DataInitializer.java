package com.example.backend.config;

import com.example.backend.model.Train;
import com.example.backend.repository.TrainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final TrainRepository trainRepository;

    @Override
    public void run(String... args) throws Exception {
        if (trainRepository.count() == 0) {
            seedTrains();
        }
    }

    private void seedTrains() {
        List<Train> trains = Arrays.asList(
                new Train(null, "Podi Menike", "1005", "Colombo", "Badulla", "05:55", "16:00", 1200.00, 500, 500),
                new Train(null, "Udarata Menike", "1015", "Colombo", "Badulla", "08:30", "17:30", 1500.00, 400, 400),
                new Train(null, "Tikiri Menike", "1023", "Colombo", "Hatton", "10:00", "14:00", 800.00, 300, 300),
                new Train(null, "Senkadagala Menike", "1035", "Colombo", "Kandy", "07:00", "09:30", 600.00, 450, 450),
                new Train(null, "Yal Devi", "4077", "Colombo", "Jaffna", "05:45", "13:00", 1800.00, 600, 600),
                new Train(null, "Uttara Devi", "4017", "Colombo", "Jaffna", "11:50", "19:00", 1800.00, 500, 500),
                new Train(null, "Galu Kumari", "8056", "Colombo", "Matara", "14:00", "17:30", 500.00, 400, 400),
                new Train(null, "Ruhunu Kumari", "8058", "Matara", "Colombo", "06:05", "09:30", 500.00, 400, 400),
                new Train(null, "Sagarika", "8096", "Galle", "Colombo", "16:45", "19:15", 400.00, 350, 350),
                new Train(null, "Sri Devi", "4003", "Colombo", "Trincomalee", "06:05", "13:30", 1600.00, 300, 300),
                new Train(null, "Night Mail", "1045", "Colombo", "Badulla", "20:00", "07:00", 2000.00, 200, 200),
                new Train(null, "Ella Odyssey", "1001", "Colombo", "Ella", "05:00", "15:00", 4000.00, 100, 100));

        trainRepository.saveAll(trains);
        System.out.println("Seeded " + trains.size() + " trains into the database.");
    }
}
