package com.lapmart.lap_mart.repository;

import com.lapmart.lap_mart.model.Order;
import com.lapmart.lap_mart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);

    @Query("select o from Order o left join fetch o.items where o.id = :id")
    Optional<Order> findByIdWithItems(@Param("id") Long id);

    @Query("select distinct o from Order o left join fetch o.user u order by o.createdAt desc")
    List<Order> findAllWithUser();
}